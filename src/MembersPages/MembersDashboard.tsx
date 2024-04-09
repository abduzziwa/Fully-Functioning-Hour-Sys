import MemberProfile from "./MemberProfile";
import MemeberSideBar from "./MemeberSideBar";

const MembersDashboard = () => {
  return (
    <>
      <div className="full">
        <MemeberSideBar />
        <div className="pro">
          <MemberProfile userId={localStorage.getItem("userId")} />
        </div>
      </div>
    </>
  );
};

export default MembersDashboard;
