import Group from "../../app/models/Group";

const GroupDetailsPage = () => {
  const group: Group = {
    id: "a",
    name: "owl",
    description: "team owls",
    title: "hello owlvernyte!",
    owner: {
      userName: "Mei",
      displayName: "Van",
    },
    projects: []
  };

  return (
    <>
      <h1>Group Details Page</h1>
      <p>{group.title}</p>
    </>
  );
};

export default GroupDetailsPage;
