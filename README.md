# Basic Rest Api Example

## This is an example project of a basic rest api for reference purposes.

- Create your profile
- Add your lists (with your token as authorization)
- Add your movie titles (with your token and list id)
- /api routes requires token

| Path          | Method |                  Resources                   |                                          Notes |
| ------------- | :----: | :------------------------------------------: | ---------------------------------------------: |
| /register     |  POST  |   all required > email, password, username   | creates your profile and will generate a token |
| /login        |  POST  |        all required > email, password        |                          will generate a token |
| /api/profile  |  GET   |            required > Your token             |                           Returns your profile |
| /api/profile  |  PUT   | all optional > email or password or username |                           Updates your profile |
| /api/post     |  POST  |  all required > title, description, public   |     Creates a post with the outlined resources |
| /api/post     |  GET   |            required > Your token             |                         fetches your own posts |
| /api/post/:id |  PUT   | all optional > title, description or public  |                              Updates your post |

## Things to do

- Make a better api docs.
- Add unit tests.
