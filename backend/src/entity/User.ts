import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn()
  userId: number;

  @Column({ type: "varchar", length: 50 })
  firstName: string;

  @Column({ type: "varchar", length: 50 })
  lastName: string;

  @Column({ unique: true, type: "varchar", length: 50 })
  username: string;

  @Column({ unique: true, type: "varchar", length: 100 })
  email: string;

  @Column("text")
  password: string;

  @Column({ nullable: true, type: "boolean" })
  isMale: boolean;

  @Column({ type: "date", nullable: true })
  birthDate: Date;

  @Column({ type: "double precision", nullable: true })
  weight: number;

  @Column({ type: "double precision", nullable: true })
  height: number;

  @Column({ type: "text", nullable: true })
  achievements: string;

  @Column({ type: "text", nullable: true })
  healthIssues: string;

  // @BeforeInsert()
  // @BeforeUpdate()
  // async hashPassword() {
  //   if (this.password) {
  //     const salt = await bcrypt.genSalt();
  //     this.password = await bcrypt.hash(this.password, salt);
  //   }
  // }
}

// async function createUser() {
//     const userRepository = getRepository(UserEntity);
//     const newUser = userRepository.create({
//         firstName: "Jane",
//         lastName: "Doe",
//         username: "janedoe",
//         email: "jane.doe@example.com",
//         password: "securepassword123", // This will be hashed before saving
//         isMale: false,
//         birthDate: new Date(1992, 2, 1)
//     });
//
//     await userRepository.save(newUser);
//     console.log("UserEntity has been saved with hashed password:", newUser);
// }
//
// async function findUser() {
//     const userRepository = getRepository(UserEntity);
//     const user = await userRepository.findOne({where: {username: "johndoe"}});
//     if (user) {
//         console.log("UserEntity found:", user);
//     } else {
//         console.log("UserEntity not found");
//     }
// }
//
// async function verifyUserPassword(username: string, password: string) {
//   const userRepository = getRepository(User);
//   const user = await userRepository.findOne({ where: { username } });
//
//   if (user && (await bcrypt.compare(password, <string>user.password))) {
//     console.log("Password is correct!");
//     return true;
//   } else {
//     console.log("Password is incorrect.");
//     return false;
//   }
// }
