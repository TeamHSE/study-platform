import React from "react";
import Image from "next/image";
import { getFullName, IUser } from "@/app/(cabinet)/profile/user";
import { getUser } from "@/app/(cabinet)/profile/api-service";
import { redirect, RedirectType } from "next/navigation";

const Profile: React.FC<IUser> = (user: IUser) => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-4 text-center">
          <Image src="profile-picture-url" alt="Profile" className="img-fluid rounded-circle mb-3" />
          <h2>{ getFullName(user) }</h2>
          <p className="text-muted">{ user.username }</p>
        </div>
        <div className="col-md-8">
          <h3>About</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque nisl eros, pulvinar facilisis justo
             mollis, auctor consequat urna.</p>
          <h3>Details</h3>
          <ul className="list-unstyled">
            <li><strong>Email:</strong> johndoe@example.com</li>
            <li><strong>Phone:</strong> (123) 456-7890</li>
            <li><strong>Location:</strong> City, Country</li>
          </ul>
          <button className="btn btn-primary">Edit Profile</button>
        </div>
      </div>
    </div>
  );
};

export async function getUserInfo(context: any) {
  console.log("Calling fetch user info\n", context);
  let userId = context.req.cookies.userId;
  if (!userId) {
    redirect("/auth/login", RedirectType.replace);
  }

  const user = await getUser(userId);
  return { props: { user } };
}

export default Profile;