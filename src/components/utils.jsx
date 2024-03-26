export const baseURLRoyal = 'http://192.168.77.209/royal_backend/public/api';
export const baseURLHome = 'http://192.168.8.120/royal_backend/public/api';
export const baseURL = baseURLRoyal;

export const calculateTimeDifference = (timeIn, staffTimeIn) => {

  // Convert strings to Date objects
  const attendanceDateObj = new Date(timeIn);
  const staffTimeInObj = new Date(staffTimeIn);
  console.log(attendanceDateObj, staffTimeInObj, staffTimeIn)

  // Calculate the difference in milliseconds
  const diffMillis = Math.abs(attendanceDateObj - staffTimeInObj);

  // Convert milliseconds to minutes
  const diffMinutes = Math.ceil(diffMillis / (1000 * 60));

  return diffMinutes;
}

export const convertDateFormat = (dateString) => {
    if (dateString.includes('/')) {
      const [day, month, year] = dateString.split('/');
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    }
    // If the date string doesn't contain '/', return the original string
    return dateString;
};


export const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength);
    }
    return text;
  };

export const getCurrentMonthYear = () => {
  const currentDate = new Date();
  const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Add leading zero if needed
  const year = currentDate.getFullYear();
  const formattedDate = `${year}-${month}`;

  return formattedDate;
};

export const formattedWeekDayOnly = {
  weekday: 'short'
};

export const formattedDayOnly = {
  day: 'numeric'
};

export const formattedDateWOWeekday = {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
};

export const formattedDate = {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  };

export const formattedMonthYear = { 
  month: 'long', 
  year: 'numeric' 
}

export const formattedTime = {
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: false,
}

export const role = (id) => {
  if(id == "1"){
    return "Admin"
  }else if(id == "2"){
    return "Chief"
  }else if(id == "3"){
    return "Department Head Assistant"
  }else if(id == "4"){
    return "Department Head"
  }else if(id == "5"){
    return "General Manager"
  }else if(id == "6"){
    return "HRD"
  }
}

export const buttons = {
  left: 0,
  middle: 1,
  right: 2,
};

export const getInitials = (name) => {
  const words = name.split(' ');
  const initials = words.map(word => word.charAt(0));
  return initials.join('').toUpperCase();
}

export const initialsToRGB = (initials) => {
  const charCodes = initials.split('').map(char => char.charCodeAt(0));
  const sum = charCodes.reduce((acc, curr) => acc + curr, 0);
  let r = Math.abs(Math.sin(sum) * 255);
  let g = Math.abs(Math.cos(sum) * 255);
  let b = Math.abs(Math.tan(sum) * 255);

  const darknessFactor = 0.5; // Adjust this value as needed
  r *= darknessFactor;
  g *= darknessFactor;
  b *= darknessFactor;

  return `rgb(${r.toFixed(0)}, ${g.toFixed(0)}, ${b.toFixed(0)})`;
}