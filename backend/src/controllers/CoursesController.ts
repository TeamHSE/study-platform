import {Request, Response} from "express";
import { Equal } from "typeorm";
import {v4 as uuid} from 'uuid';
// import {toUUID} from "to-uuid";
import { Course } from "../entity/Course";
import { CoursesViewer } from "../entity/CoursesViewers";
import * as console from "node:console";

export const createCourse = async (req: Request, res: Response) => {
  const { name, description, authorId } = req.body;

  try {
    const isCourseExist = await Course.findOneBy({ name: Equal(name) });
    if (isCourseExist !== null) {
      return res
        .status(409)
        .json({ error: "Course with such name is already exist!" });
    }
    const courseUUID = uuid();
    const viewerUUID = uuid();

    const newCourse = Course.create({
      courseId: courseUUID,
      name: name,
      description: description,
      isVisible: false,
      viewersViewerId: viewerUUID,
    });
    await Course.save(newCourse).catch(err => console.log(err));

    const newViewer = CoursesViewer.create({
      viewerId: viewerUUID,
      userId: authorId,
      courseId: newCourse.courseId,
    });
    await CoursesViewer.save(newViewer).catch(err => console.log(err));

    return res.status(201).json({ course_id: newCourse.courseId });
  } catch (error) {
    return res.status(422).json({ error: "Validation error" });
  }
};

export const deleteCourse = async (req: Request, res: Response) => {
  const path = req.path.split("/")
  // const courseUUID = <uuid>toUUID(path[path.length - 1]);
  const courseUUID = <uuid>(path[path.length - 1]);

  try {
    const course = await Course.findOneBy({ courseId: courseUUID });
    if (!course) {
      return res.status(404).json({ error: "Course not exist" });
    }
    await Course.delete(courseUUID);

    return res.sendStatus(204);
  } catch (error) {
    return res.status(422).json({ error: "Invalid ID" });
  }
};
