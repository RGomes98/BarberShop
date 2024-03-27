export const formatToDateTime = (date?: Date) => {
  const [day, month, year] = Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Sao_Paulo',
    month: '2-digit',
    year: 'numeric',
    day: '2-digit',
  })
    .format(date)
    .split('/');

  return [year, day, month].join('-');
};

export const formatDate = (date: string) => {
  return new Intl.DateTimeFormat('pt-BR', {
    timeZone: 'America/Sao_Paulo',
    minute: 'numeric',
    weekday: 'long',
    hour: 'numeric',
    year: 'numeric',
    day: 'numeric',
    month: 'long',
  }).format(new Date(date));
};

export const formatDateShort = (date: Date) => {
  return new Intl.DateTimeFormat('pt-BR', {
    timeZone: 'America/Sao_Paulo',
    weekday: 'long',
    year: 'numeric',
    day: 'numeric',
    month: 'long',
  }).format(date);
};

export const formatDateGetWeekAndDay = (date: Date) => {
  return new Intl.DateTimeFormat('pt-BR', {
    timeZone: 'America/Sao_Paulo',
    weekday: 'long',
    day: '2-digit',
    month: 'long',
  }).format(date);
};

export const formatDateGetDay = (date: string) => {
  return new Intl.DateTimeFormat('pt-BR', {
    timeZone: 'America/Sao_Paulo',
    day: '2-digit',
    month: 'long',
  }).format(new Date(date));
};

export const formatDateGetHour = (date?: string) => {
  return new Intl.DateTimeFormat('pt-BR', {
    timeZone: 'America/Sao_Paulo',
    minute: 'numeric',
    hour: 'numeric',
  }).format(new Date(date || new Date()));
};

export const isNotWithinThirtyDaysRange = (date: Date) => {
  return !(
    new Date(new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1)) >= new Date() &&
    date <= new Date(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 30))
  );
};
