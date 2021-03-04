# connectar-meetup-mar-4

A repository for Connectar.DEV meetup on March 4, 2021. Slides link: https://drive.google.com/file/d/1uuPbO-uXWRgn8qGxukqwFpeDN7jgguyH/view?usp=sharing.

## Installation

Do `yarn` in all 3 folders: `frontend`, `backend`, and `e2e`.

## How to Run

```bash
# Terminal 1.
$ cd backend
$ yarn start

# Terminal 2.
$ cd frontend
$ yarn start
```

## How to Test

### Component Test

```bash
$ cd frontend
$ yarn test
```

### End-to-End

#### Headed

```bash
# Ensure that the backend and frontend are running.
$ cd e2e
$ yarn cypress
```

#### Headless

```bash
$ make e2e
```
