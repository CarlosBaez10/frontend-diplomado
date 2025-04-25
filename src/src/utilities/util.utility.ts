type TypeFilter = {
  [key: string]: number;
};

export const getType = (query: string): number => {
  const types: TypeFilter = {
    externos: 1,
    wiedii: 4,
    administradores: 3,
  };
  return types[query.toLowerCase()] || 1;
};
