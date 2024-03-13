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