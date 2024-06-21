import { Request, Response } from "express";
import { Equal, getRepository } from "typeorm";
import { Course } from "../entity/Course";
import { CoursesModule } from "../entity/CoursesModules";
import { CoursesViewer } from "../entity/CoursesViewers";
import { UsersRole } from "../entity/UsersRoles";

const maintainerRole = await getRepository(UsersRole).findOneBy({
  name: "maintainer",
});

export const createCourse = async (req: Request, res: Response) => {
  const { name, description, authorId } = req.body;

  try {
    const courseRepository = getRepository(Course);
    const isCourseExist = await courseRepository.findBy({ name: Equal(name) });
    if (isCourseExist) {
      return res
        .status(409)
        .json({ error: "Course with such name is already exist!" });
    }
    const newCourse = courseRepository.create({
      name,
      description,
    });
    await courseRepository.save(newCourse);

    const viewersRepository = getRepository(CoursesViewer);
    const newViewer = viewersRepository.create({
      userId: authorId,
      courseId: newCourse.courseId,
      roleId: maintainerRole.roleId,
    });
    await viewersRepository.save(newViewer);

    return res.status(201).json({ course_id: newCourse.courseId });
  } catch (error) {
    return res.status(422).json({ error: "Validation error" });
  }
};

export const deleteCourse = async (req: Request, res: Response) => {
  const { courseId } = req.params;

  try {
    const courseRepository = getRepository(Course);
    const course = await courseRepository.findOneBy({ courseId: courseId });

    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    await courseRepository.delete(courseId);

    return res.sendStatus(204);
  } catch (error) {
    return res.status(422).json({ error: "Invalid ID" });
  }
};
