export function formatDate(date: Date, format: string): string {
  const options: Intl.DateTimeFormatOptions = {};
  
  if (format.includes('YYYY')) {
    options.year = 'numeric';
  }
  
  if (format.includes('MM')) {
    options.month = '2-digit';
  } else if (format.includes('MMMM')) {
    options.month = 'long';
  }
  
  if (format.includes('DD')) {
    options.day = '2-digit';
  } else if (format.includes('D')) {
    options.day = 'numeric';
  }
  
  if (format.includes('dddd')) {
    options.weekday = 'long';
  }
  
  if (format.includes('h:mm')) {
    options.hour = 'numeric';
    options.minute = '2-digit';
  }
  
  if (format.includes('A')) {
    options.hour12 = true;
  }
  
  return new Date(date).toLocaleString('en-US', options);
}