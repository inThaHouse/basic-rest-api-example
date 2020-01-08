# Basic Rest Api Example (in progress)

## This is an example project of a basic rest api for reference purposes.

- Create your profile
- Add your lists (with your token as authorization)
- Add your movie titles (with your token and list id)
- /api routes requires token

| Path         | Method |             Resources             |                                          Notes |
| ------------ | :----: | :-------------------------------: | ---------------------------------------------: |
| /register    |  POST  |     email, password, username     | creates your profile and will generate a token |
| /login       |  POST  |          email, password          |                          will generate a token |
| /api/profile |  GET   |            Your token             |                           Returns your profile |
| /api/profile |  PUT   |   email or password or username   |                           Updates your profile |
| /api/list    |  POST  |         name, description         |  creates the name of a list under your profile |
| /api/list    |  GET   |            Your token             |                             Returns your lists |
| /api/post    |  POST  | Your token (check code for model) |           Creates a post title under your list |

## Things to do

- Need better validation for profile creation.
- Get post based on list of user. (see .populate() in mongoose docs)
- Finish api doc.
- Add unit tests.
