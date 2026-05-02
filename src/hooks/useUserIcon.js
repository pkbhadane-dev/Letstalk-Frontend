
export const useUserIcon = (user) => {
    const firstLetter = user?.firstname?.[0].toUpperCase();
    const secondLetter = user?.lastname?.[0].toUpperCase();
    return firstLetter + secondLetter;
    
  };