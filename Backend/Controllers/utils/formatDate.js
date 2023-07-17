

export function formatDate(date) {
    const eventDate = new Date(date);
    const day = String(eventDate.getDate()).padStart(2, '0');
    const month = String(eventDate.getMonth() + 1).padStart(2, '0');
    const year = eventDate.getFullYear();
    return `${day}/${month}/${year}`;
  }