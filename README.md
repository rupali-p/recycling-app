# recycling-app

## Introduction

The recycling-app is a application (platform TBD) that allows a user to upload or scan a recycling code on an item and recieve instructions on how to best recycle it. The goal of this is to encourage people to correctly recycle their rubbish.

This project was done as a project for the Software Innovation Studio

### Git commit policy.

Branch names will be named as follows

- sprint-number/tribe name

  For example: 1/back-end, 1/ml

- When a feature from a tribe is complete, members should tag another member of their tribe to review and approve the changes before it is merged.
- A pull request name should match the name of the ticket on trello.
- When a sprint has been completed and all tribes branches for that sprint have been stablised (free of bugs or crashes), a member of that tribe will need to submit a PR for the branch changes to be merged with the 'dev' branch
- Once the dev branch has been stablished with all requests, that branch should be merged with the main branch.

### Git Etiquette / Best Practices

#### Commit Early, Commit Often

- **Commit small changes frequently** to keep a clear history of all the changes that have been made
- Use **descriptive commit messages** to explain your changes so that if there's an error, we can easily pin point what happened/where/when and revert/create a bug fix for it

```
git add .
git commit -m "pr fix: resolved xxx xxx bug"
```

#### Squash and Merge

<img width="193" alt="image" src="https://github.com/rupali-p/recycling-app/assets/79547654/7232f63f-f7fe-4881-bf7c-15908ff0649c">

- Ensure you use "**Squash and Merge**" for pull requests to maintain a clean history!! It's defaulted to merge but SQUASH and merge is important because it condenses multiple commits into one, making our main branch's commit history more readable and less cluttered
- You might need to click on the arrow on the button to get to **Squash and Merge**
- This is especially helpful when working on feature branches with several small commits (we don't need to see allll the small fixes that's been done on your branch when all of your commits are merged to main </33)
- Squashing and merging simplifies the commit history, making it easier for everyone to understand the changes made

#### Rebase

- Interactive Rebasing (git rebase -i):

  - This is the most versatile form of rebasing because it allows you to interactively edit commits during the rebase
  - You can squash, split, reorder, or even remove commits altogether
  - It's useful for cleaning up commit history or combining related commits into one
  - `git rebase -i HEAD~X` where X is the number of commits back you want to rebase to
    - for example `git rebase -i HEAD~2` will allow you to rebase up to the last 2 commits

- Standard Rebasing (git rebase):

  - This is a non-interactive rebase that simply moves your commits to a new base commit
  - Commonly used to update a feature branch with changes from the main branch or to create a linear commit history

- Always save a duplicate copy of your files away from your local recycling folder so that if you accidentally do something, you can retrieve your work easily

#### Rebase Instead of Merge

- Use `git rebase` to keep a linear history and minimize merge conflicts, especially before merging to main!!

```markdown
git switch main
git pull
git switch your-branch
git rebase main // rebase your feature branch onto the latest main branch
// if there are conflicts, the simplest way is to use the built-in VSC resolve conflict tool to fix it
git rebase --continue
git push --force-with-lease // pushes your rebased changes to the remote feature branch with force (use --force-with-lease for safety)
// ping or call rups if you need help w this
```

#### Stash Your Changes

- Use `git stash` to temporarily shelve/commit any unfinished work (helps when you're switching between branches)

```markdown
git stash save "Work in progress"
git stash apply
```

- this can get a bit confusing so instead try and commit your change so far and mention "saving draft" in your commit message

#### Keep Your Branches Clean

- Delete merged feature branches (i can try and get it deleted automatically but i reckon we need to get the other best practices down pat first)
- Regularly prune remote branches ^ again after we've mastered best practices

#### Collaborate and Communicate

- Use meaningful branch and tag names as mentioned in the section above in `Git commit policy`

### Run Instructions

To run the app (both backend and frontend), run the command in the root directory:

### `py run-app.py` OR `python3 run-app.py`

#### If you would like to run only the backend or frontend respectively, follow the prompts below

To run the backend on port 5000, cd into flask-server and run the command:

### `py server.py`

To run the front-end on port 3000, cd into client and run the command:

### `npm start`

### Tech Stacks

#### Frontend (React):

- **React**: Utilizing React to build the user interface of the web application.

- **React Router**: Implementing React Router for managing navigation and routing within the React application.

#### Backend (Flask):

- **Flask**: A micro web framework for Python; forming the backend of the web app. It sets up routes and controllers to handle HTTP requests, serving as the API for the frontend.

- **MongoDB**: A NoSQL database; managing data storage. Interaction with MongoDB occurs through the PyMongo library from the Flask app (which is required to be installed, and is done when running run-app.py).

- **YOLOv8**: For real-time object detection, YOLOv8 is integrated into the backend (via ONNX). This involves loading the YOLOv8 model, processing images or videos, and sending object detection results to the frontend.

- **ONNX**: ONNX proves valuable for representing and working with deep learning models like YOLOv8 in the Flask app.

- **CVAT**: CVAT simplifies the manual annotation for YOLOv8 dataset
  - CVAT facilitates the annotation of objects in images, generating labeled data that can be used for training YOLOv8 object detection models
  - Its annotation capabilities streamline the process of creating annotated datasets for YOLOv8, a crucial step in training accurate object detection models
  - ARL data can be found here: https://drive.google.com/drive/folders/1yxLlRc2n2mZ4P-ArWnj_5nR9JWGuLAMs 
  - Rups will do a live demo to get everyone to use CVAT and start annotating
