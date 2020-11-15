import React from "react";
import { postList } from "../data";
import { useQueryPosts } from "../post.hooks";
const PostContext = React.createContext();
const PostProvider = (props) => {
  const [data, setData] = React.useState([]);
  const [selectedProject,setSelectedProject] =React.useState(props?.selectedProject);
  const {data:dataPost} = useQueryPosts(selectedProject,props?.tag);
  const [myRole,setMyRole] =React.useState('');
  function addPost(post){
    setData([post,...data])
  }
  function addComment(comment){
    console.log(comment);
  }
  function handleSelectedProject(project){
    console.log({project})
    setSelectedProject(project?.id);
    setMyRole(project?.myRole)
  }
  React.useEffect(() => {

    if(dataPost){
      setData(dataPost);
    }
  }, [dataPost,selectedProject]);
  return (
    <PostContext.Provider
      value={{
        data,
        addPost,
        addComment,
        selectedProject,
        handleSelectedProject,
        myRole
      }}
    >
      {props.children}
    </PostContext.Provider>
  );
};
const usePostContext = () => React.useContext(PostContext);
export { PostContext, PostProvider, usePostContext };
