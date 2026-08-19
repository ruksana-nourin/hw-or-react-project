import { Link, useParams } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import PageHeading from "../../../components/PageHeading.tsx";
import { type Post, defaultPost } from "../../../interfaces/Post";

function PostDetails() {
  const { id } = useParams();
  const [post, setPost] = useState<Post>(defaultPost);
  const [user, setUser] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
    address: {
      street: "",
      suite: "",
      city: "",
      zipcode: "",
    },
    company: {
      name: "",
      catchPhrase: "",
      bs: "",
    }
  });
  const [comments, setComments] = useState([
    {id: 0,
    email: "",
    name: "",
    body: "",}
  ]);


  function getData() {
    axios.get("https://jsonplaceholder.typicode.com/posts/" + id)
      // axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then(function (res) {
        // console.log(res.data);
        setPost(res.data);
        return axios.get("https://jsonplaceholder.typicode.com/users/" + res.data.userId)
      })
      .then(function (res) {
        // console.log(res.data);
        setUser(res.data);
      })
      .catch(function (err) {
        console.log(err);
      });
  }

  function getAllComments() {
    axios.get(`https://jsonplaceholder.typicode.com/posts/${id}/comments`)
      .then(function (res) {
        console.log(res.data);
        setComments(res.data);
      })
      .catch(function (err) {
        console.log(err);
      });
  }
  useEffect(() => {
    getData();
    getAllComments();
  }, []);
  return (
    <>
      <main className="dashboard-content">
        <div className="container-fluid px-3 px-lg-4 py-4">
          <PageHeading
            subtitle="Management"
            title="Post Details"
          >
            <Link className="btn btn-outline-secondary btn-sm" to="/Post">
              <i className="bi bi-arrow-left" aria-hidden="true"></i> Back to
              Posts
            </Link>
            <Link className="btn btn-primary btn-sm" to="/Post-create">
              <i className="bi bi-person-plus" aria-hidden="true"></i> Add Post
            </Link>
          </PageHeading>

          <section className="row g-3">
            <div className="col-12 col-xl-4">
              <div className="panel h-100 text-center profile-card">
                <div className="profile-cover text-bg-success"></div>
                <div className="profile-hero">
                  <img
                    className="avatar-img avatar-xl profile-photo mb-3"
                    src="https://i.pravatar.cc/100"
                    alt="Asia R."
                  />
                  <h2 className="h5 mb-1">{user.name}</h2>
                  <p className="badge bg-warning ">{user.username}</p>
                  <p className="text-muted small mb-0">{user.email}</p>
                  <p className="text-muted small mb-0">{user.phone}</p>
                  <p className="text-muted small mb-0">
                    {user.address.street}, {user.address.suite}, {user.address.city}, {user.address.zipcode}
                  </p>
                  <p className="text-muted small mb-0">
                    {user.company.name} - {user.company.catchPhrase}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-12 col-xl-8">
              <div className="panel mb-3">
                <div className="panel-header">
                  <Link to={`/Post-edit/${id}`} className="btn btn-primary btn-sm ms-auto">
                    Edit Post
                  </Link>
                </div>
                <h2 className="h5 mb-3 section-title">
                  <span>{post.title}</span>
                </h2>
                <div className="mini-card">
                  <p className="text-muted mb-0">
                    {post.body}
                  </p>
                </div>
              </div>
              <div className="panel">
                <div className="panel-header">
                  <div>
                    <h2 className="h5 mb-1 section-title">
                      <i className="bi bi-chat" aria-hidden="true"></i>
                      <span>Comments</span>
                    </h2>
                    <p className="text-muted mb-0">
                      Latest comments on this post.
                    </p>
                  </div>
                </div>
                <div className="activity-list">
                  {comments.map((item) => {
                    return (
                      <div key={item.id} className="activity-item">
                        <span className="activity-dot bg-success"></span>
                        <div>
                          <h1 className="h6 mb-1 bg-success text-white px-2 py-1 rounded"> {item.name} </h1>
                          <p className="text-muted small mb-0">{item.email}</p>
                          <p className="text-muted small mb-0">{item.body}</p>
                        </div>
                      </div>
                    );
                  })};

                      


                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
export default PostDetails;
