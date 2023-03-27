# Abstract

A brief description of what this project does and who it's for

![Logo](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/th5xamgrr6se0x5ro4g6.png)

## Installation

Install my-project with npx

```bash
  npx create-next-abstract my-project
  cd my-project
```

## Features

- Client and Server side fetcher
- Multi Backend support
- Fullscreen mode
- Cross platform

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

##### Base Configs

| Category                     | Description                                                |
| :--------------------------- | :--------------------------------------------------------- |
| `NEXT_PUBLIC_SITENAME`       | Your site name                                             |
| `NEXT_PUBLIC_LOCAL_URL`      | `Link` of your local site                                  |
| `NEXT_PUBLIC_IMG_SERVER`     | `Link` of your asset server                                |
| `NEXT_PUBLIC_DEFAULT_TARGET` | Default backend to be targetted                            |
| `TOKEN_LIFETIME`             | Time a token have to staty in cache                        |
| `PROXY_ROUTE`                | Define if you want to change your default dispatcher route |
| `REDIS_URL`                  | `Link` of redis server                                     |

##### Backend Configs

| Category             | Description                        |
| :------------------- | :--------------------------------- |
| `MYBACK_BACKEND_URL` | `Link` of your backend server      |
| `MYBACK_IDENTIFIER`  | `CRED` client_id                   |
| `MYBACK_PASSWORD`    | `CRED` client_secret               |
| `MYBACK_GRANT_TYPE`  | `OPT` grant_type of your backend   |
| `MYBACK_SCOPE`       | `OPT` scope of your backend server |

## Running Tests

To run tests, run the following command

```bash
  yarn test
```

## Tech Stack

**Client:** React, Next.js, ChakraUI

**Server:** Node

## Used By

This project is used by the following projects:

- [E-Shop Orange](https://boutique.orange.sn)
- [Portal Orange](https://orange.sn)
- [API Documentation Orange](https://developer.orange-sonatel.com)
- [API Console Orange](https://developer.orange-sonatel.com)

## Contributing

Contributions are always welcome!

See `contributing.md` for ways to get started.

Please adhere to this project's `code of conduct`.

## Run Locally

Clone the project

```bash
  git clone https://github.com/osnmarket/abstract.git
```

Go to the project directory

```bash
  cd my-project
```

Install dependencies

```bash
  yarn
```

Start the server

```bash
  yarn dev
```

## Roadmap

- Additional browser support

- Add more integrations

## Authors

- [@LPIX-11](https://www.github.com/LPIX-11)

## License

[MIT](https://choosealicense.com/licenses/mit/)

## Feedback

If you have any feedback, please reach out to us at teamb2c@orange-sonatel.com
