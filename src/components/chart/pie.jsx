import { ResponsivePie } from "@nivo/pie";

const Pie = ({data}) => (
    <ResponsivePie
    colors={['#47eb63', '#4799eb', '#f0e375', '#eb7047']}
        fit={true}
        data={data}
        margin={{ top: 5, right: 10, bottom: 100, left: 10 }}
        innerRadius={0.5}
        padAngle={0.1}
        cornerRadius={3}
        activeOuterRadiusOffset={8}
        borderWidth={1}
        borderColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    0.5
                ]
            ]
        }}
        enableArcLinkLabels={false}
        legends={[
            {
                anchor: 'bottom',
                direction: 'column',
                justify: false,
                translateX: 0,
                translateY: 70,
                itemsSpacing: 2,
                itemWidth: 100,
                itemHeight: 18,
                itemTextColor: '#999',
                itemDirection: 'left-to-right',
                itemOpacity: 1,
                symbolSize: 18,
                symbolShape: 'circle',
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemTextColor: '#000'
                        }
                    }
                ]
            }
        ]}
    />
)

export default Pie;