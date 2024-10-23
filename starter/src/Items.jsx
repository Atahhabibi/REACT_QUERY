import { usefetchTask } from "./reactQueryCustomHooks";
import SingleItem from "./SingleItem";


const Items = ({ items }) => {

  const{isLoading,isError,data}=usefetchTask(); 
 
  if (isLoading) {
    return <p style={{ marginTop: "1rem" }}>Loading....</p>;
  }
  if(isError){
    return <p style={{ marginTop: "1rem" }}>Error.....</p>;
  }

  return (
    <div className="items">
      {data.data.taskList.map((item) => {
        return <SingleItem key={item.id} item={item} />;
      })}
    </div>
  );
};
export default Items;
