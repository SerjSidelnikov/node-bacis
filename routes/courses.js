const {Router} = require('express');

const Course = require('../models/courses');
const auth = require('../middleware/auth');

const router = Router();

router.get('/', async (req, res) => {
  try {
    const courses = await Course.find()
      .populate('userId', 'email name');

    res.render('courses', {
      title: 'Курсы',
      isCourses: true,
      userId: req.user ? req.user._id.toString() : null,
      courses,
    });
  } catch (e) {
    console.log(e);
  }
});

router.get('/:id', async (req, res) => {
  const course = await Course.findById(req.params.id);
  res.render('course', {
    layout: 'empty',
    title: `Курс ${course.title}`,
    course,
  });
});

router.get('/:id/edit', auth, async (req, res) => {
  if (!req.query.allow) {
    return res.redirect('/');
  }

  try {
    const course = await Course.findById(req.params.id);

    if (course.userId.toString() !== req.user._id.toString()) {
      return res.redirect('/courses');
    }

    res.render('course-edit', {
      title: `Редактировать ${course.title}`,
      course,
    });
  } catch (e) {
    console.log(e);
  }
});

router.post('/edit', auth, async (req, res) => {
  await Course.findByIdAndUpdate(req.body.id, req.body);

  res.redirect('/courses');
});

router.post('/remove', auth, async (req, res) => {
  try {
    await Course.deleteOne({
      _id: req.body.id,
    });

    res.redirect('/courses');
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
