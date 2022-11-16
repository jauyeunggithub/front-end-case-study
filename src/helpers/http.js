export const searchUsers = async (keyword) => {
  const res = await fetch(`https://api.github.com/search/users?q=${keyword}`);
  return res.json();
};

export const searchOrgs = async (keyword) => {
  const res = await fetch(
    `https://api.github.com/search/users?q=${keyword}+type:org`
  );
  return res.json();
};
