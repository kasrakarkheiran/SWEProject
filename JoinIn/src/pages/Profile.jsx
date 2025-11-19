import {useAuthContext} from "../hooks/useAuthContext";

export function Profile() {
  const {user} = useAuthContext();

  return (
    <div style={{ padding: "20px" }}>
      <h1>Profile</h1>

      <img 
        src={user.avatar || "https://via.placeholder.com/150"} 
        width="120"
        style={{ borderRadius: "50%" }}
      />

      <p><strong>Name:</strong> {user.name || "not implemented"}</p>
      <p><strong>Email:</strong> {user.email}</p>
    </div>
  );
}