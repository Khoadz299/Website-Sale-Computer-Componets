interface IUser {
  name: string;
  age: number;
}

const User = (Pros: IUser) => {
  return (
    <div>
      <h1>{Pros.name}</h1>
      <h2>{Pros.age}</h2>
    </div>
  );
};
export default User;
