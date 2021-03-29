const mongoose = require("mongoose");

// Models

const Work = require("../models/work");

// Get all works

exports.works_get_all = (req, res, next) => {
  Work.find()
    .select("id name description photos")
    .exec()
    .then((docs) => {
      const responce = {
        totalItemCount: docs.length,
        works: docs.map((doc) => ({
          id: doc._id,
          name: doc.name,
          description: doc.description,
          photos: doc.photos,
        })),
      };

      res.status(200).json(responce);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
};

// Get work by id

exports.works_get_work_by_id = (req, res, next) => {
  const id = req.params.workId;

  Work.findById(id)
    .select("id name description photos")
    .exec()
    .then((doc) => {
      if (doc) {
        res.status(200).json({
          id: doc._id,
          name: doc.name,
          description: doc.description,
          photos: doc.photos,
        });
      } else
        res
          .status(404)
          .json({ message: "No valid entry found by provided ID" });
    })
    .catch((err) => {
      res.status(500).json({ error: err || "Dont know what happened" });
    });
};

// Create work

exports.works_create_work = (req, res, next) => {
  const id = new mongoose.Types.ObjectId();
  const work = new Work({
    id: id,
    name: req.body.name,
    description: req.body.description,
    photos: { img: "http://localhost:4000/" + req.file.path, workId: id },
  });

  work
    .save()
    .then((results) => {
      console.log(results);
    })
    .catch((err) => console.log(err));

  res.status(201).json({
    status: "Created",
    work: {
      id: work.id,
      name: work.name,
      description: work.description,
      photos: work.photos,
    },
  });
};

// Update work

exports.works_update_work = (req, res, next) => {
  const id = req.params.workId;
  const updateOps = {};

  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }

  Work.update({ _id: id }, { $set: updateOps })
    .exec()
    .then(() => {
      res.status(200).json({
        status: "Updated",
      });
    })
    .catch((err) =>
      res.status(500).json({
        error: err,
      })
    );
};

// Delete work

exports.works_delete_work = (req, res, next) => {
  const id = req.params.workId;

  Work.remove({ _id: id })
    .exec()
    .then(() =>
      res.status(200).json({
        status: "Deleted",
      })
    )
    .catch((err) => res.status(500).json({ error: err }));
};
