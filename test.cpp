#include <windows.h>
#include <gl/gl.h>
#include <gl/glu.h>
#include <math.h>

class Point2   
{
public:
    float x, y;
    Point2() {x = y = 0.0f;} 
    Point2(float xx, float yy) {x=xx; y=yy;} 
    void set(float xx, float yy) {x=xx; y=yy;}
    float getX() {return x;}
    float getY() {return y;}
    void draw(void)
    {
        glBegin(GL_POINTS);
            glVertex2f((GLfloat)x, (GLfloat)y);
        glEnd();
    }
};

void moveTo(float x, float y) 
{
    glLoadIdentity();
    glTranslatef(x, y, 0);
}

void drawCircle(Point2 center, float radius)
{
    const int numVerts = 50;
    glBegin(GL_TRIANGLE_FAN);
    for (int i = 0; i <= numVerts; ++i) 
    {
        float angle = i * (2 * M_PI / numVerts);
        float x = center.getX() + radius * cos(angle);
        float y = center.getY() + radius * sin(angle);
        glVertex2f(x, y);
    }
    glEnd();
}

void drawEye(Point2 center, float radius)
{
    const int numVerts = 50;
    glBegin(GL_TRIANGLE_FAN);
    for (int i = 0; i <= numVerts; ++i) 
    {
        float angle = i * (2 * M_PI / numVerts);
        float x = center.getX() + radius * cos(angle);
        float y = center.getY() + radius * sin(angle);
        glVertex2f(x, y);
    }
    glEnd();

    // Draw pupil
    Point2 pupilCenter(center.getX() + radius * 0.5f, center.getY() + radius * 0.5f);
    const float pupilRadius = radius * 0.2f;
    glColor3f(0.0f, 0.0f, 0.0f);
    drawCircle(pupilCenter, pupilRadius);
}

void drawSmile(Point2 center, float radius)
{
    const float PI = 3.14159265359;
    float angle;
    glBegin(GL_LINE_STRIP);
    for (int i = 0; i <= 180; ++i) 
    {
        angle = i * PI / 180.0f;
        glVertex2f(center.getX() + radius * cos(angle), center.getY() - radius * sin(angle)); // Perubahan pada center.getY()
    }
    glEnd();
}


LRESULT CALLBACK WndProc(HWND hWnd, UINT message, WPARAM wParam, LPARAM lParam);

void EnableOpenGL(HWND hWnd, HDC *hDC, HGLRC *hRC);
void DisableOpenGL(HWND hWnd, HDC hDC, HGLRC hRC);

void Inisialisasi(GLfloat lebar, GLfloat tinggi)
{
    glClearColor(1, 1, 1, 0);
    glClear(GL_COLOR_BUFFER_BIT);
    glViewport(0, 0, (GLsizei)lebar, (GLsizei)tinggi);
    glMatrixMode(GL_PROJECTION);
    glLoadIdentity();
    gluOrtho2D(0.0, lebar, 0.0, tinggi);
    glMatrixMode(GL_MODELVIEW);
}

int WINAPI WinMain(HINSTANCE hInstance, HINSTANCE hPrevInstance, LPSTR lpCmdLine, int iCmdShow)
{
    WNDCLASS wc;
    HWND hWnd;
    HDC hDC;
    HGLRC hRC;
    MSG msg;
    BOOL bQuit = FALSE;
    Point2 center;
    center.x = 512;
    center.y = 300;

    wc.style = CS_OWNDC;
    wc.lpfnWndProc = WndProc;
    wc.cbClsExtra = 0;
    wc.cbWndExtra = 0;
    wc.hInstance = hInstance;
    wc.hIcon = LoadIcon(NULL, IDI_APPLICATION);
    wc.hCursor = LoadCursor(NULL, IDC_ARROW);
    wc.hbrBackground = (HBRUSH)GetStockObject(BLACK_BRUSH);
    wc.lpszMenuName = NULL;
    wc.lpszClassName = "TF-UAJY";
    RegisterClass(&wc);

    hWnd = CreateWindow("TF-UAJY", "OpenGL Tutor Tugas #1: LINGKARAN",
        WS_CAPTION | WS_POPUPWINDOW | WS_VISIBLE,
        0, 0, 1024, 768,
        NULL, NULL, hInstance, NULL);

    EnableOpenGL(hWnd, &hDC, &hRC);
    Inisialisasi(1024, 768);

    while (!bQuit)
    {
        if (PeekMessage(&msg, NULL, 0, 0, PM_REMOVE))
        {
            if (msg.message == WM_QUIT)
            {
                bQuit = TRUE;
            }
            else
            {
                TranslateMessage(&msg);
                DispatchMessage(&msg);
            }
        }
        else
        {
            glClear(GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT);
            glPushMatrix();
            moveTo(center.getX(), center.getY());
            glColor3f(1.0f, 1.0f, 0.0f); // Yellow
            drawCircle(center, 100); // Head

            // Draw Eyes
            glColor3f(0.0f, 0.0f, 0.0f); // Black
            drawEye(Point2(center.getX() - 50, center.getY() + 50), 15); // Left Eye
            drawEye(Point2(center.getX() + 50, center.getY() + 50), 15); // Right Eye

            // Draw Smile
            glColor3f(0.0f, 0.0f, 0.0f); // Black
            drawSmile(center, 50); // Mouth

            glPopMatrix();
            SwapBuffers(hDC);
        }
    }

    DisableOpenGL(hWnd, hDC, hRC);
    DestroyWindow(hWnd);

    return msg.wParam;
}

LRESULT CALLBACK WndProc(HWND hWnd, UINT message, WPARAM wParam, LPARAM lParam)
{
    switch (message)
    {
    case WM_CREATE:
        return 0;
    case WM_CLOSE:
        PostQuitMessage(0);
        return 0;
    case WM_DESTROY:
        return 0;
    case WM_KEYDOWN:
        switch (wParam)
        {
        case VK_ESCAPE:
            PostQuitMessage(0);
            return 0;
        }
        return 0;
    default:
        return DefWindowProc(hWnd, message, wParam, lParam);
    }
}

void EnableOpenGL(HWND hWnd, HDC *hDC, HGLRC *hRC)
{
    PIXELFORMATDESCRIPTOR pfd;
    int iFormat;

    *hDC = GetDC(hWnd);

    ZeroMemory(&pfd, sizeof(pfd));
    pfd.nSize = sizeof(pfd);
    pfd.nVersion = 1;
    pfd.dwFlags = PFD_DRAW_TO_WINDOW | PFD_SUPPORT_OPENGL | PFD_DOUBLEBUFFER;
    pfd.iPixelType = PFD_TYPE_RGBA;
    pfd.cColorBits = 24;
    pfd.cDepthBits = 16;
    pfd.iLayerType = PFD_MAIN_PLANE;

    iFormat = ChoosePixelFormat(*hDC, &pfd);
    SetPixelFormat(*hDC, iFormat, &pfd);

    *hRC = wglCreateContext(*hDC);
    wglMakeCurrent(*hDC, *hRC);
}

/******************
 * Disable OpenGL
 *
 ******************/

void
DisableOpenGL (HWND hWnd, HDC hDC, HGLRC hRC)
{
    wglMakeCurrent (NULL, NULL);
    wglDeleteContext (hRC);
    ReleaseDC (hWnd, hDC);
}