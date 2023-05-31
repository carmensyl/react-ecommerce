## ECommerce Project

ECommerce provides a way to quickly get up and running with a fully configurable ECommerce site using Next.js.

Out of the box, the site uses completely static data coming from a provider at `providers/inventoryProvider.js`. You can update this provider to fetch data from any real API by changing the call in the `getInventory` function.

![Home](example-images/1.png)

### Getting started

1. Clone the project

```sh
$ git clone https://github.com/bladerunnersde/ecommerce.git
```

```sh
cd <repository_directory>
```

Create a new branch:

```sh
git checkout -b <new_branch_name>
```

Replace <new_branch_name> with a meaningful name for your branch. For example, if you are working on a feature called "user-authentication", you can use:

```sh
git checkout -b feature/user-authentication
```

2. Install the dependencies:

```sh
$ yarn

# or

$ npm install
```

3. Run the project

```sh
$ npm run dev

# or to build

$ npm run build
```

## About the project

### Tailwind

This project is styled using Tailwind. To learn more how this works, check out the Tailwind documentation [here](https://tailwindcss.com/docs).

### Components

The main files, components, and images you may want to change / modify are:

**Logo** - public/logo.png  
**Button, ListItem, etc..** - components  
**Form components** - components/formComponents  
**Context (state)** - context/mainContext.js  
**Pages (admin, cart, checkout, index)** - pages  
**Templates (category view, single item view, inventory views)** - templates

### How it works

As it is set up, inventory is fetched from a local hard coded array of inventory items. This can easily be configured to instead be fetched from a remote source like Shopify or another CMS or data source by changing the inventory provider.

#### Configuring inventory provider

Update **utils/inventoryProvider.js** with your own inventory provider.

### On Next.js

Next.js is a popular React framework for building server-side rendered (SSR) and static websites. It provides a set of powerful features and conventions that make it easier to develop production-ready React applications.

Here are some use cases/examples where Next.js can be beneficial:

- Server-side Rendering (SSR): Next.js enables server-side rendering, which means the initial HTML content is generated on the server and sent to the client. SSR improves performance by reducing the time required for the first contentful paint and providing better SEO results. It is particularly useful for content-heavy websites, blogs, e-commerce platforms, or any application that requires SEO optimization.

- Static Site Generation (SSG): Next.js supports static site generation, where the HTML pages are pre-built at build time and served as static files. This approach is ideal for websites with static content that doesn't need real-time updates, such as marketing websites, landing pages, documentation sites, or blogs. It provides excellent performance and scalability, as the static files can be cached and served directly from a CDN.

- API Routes: Next.js allows you to create serverless API endpoints within your application. These API routes can handle server-side logic and respond to incoming HTTP requests. It's convenient for building backend services, RESTful APIs, or handling form submissions without the need for an external server.

- Authentication and Authorization: Next.js provides built-in support for authentication and authorization with its authentication providers and authorization middleware. You can easily integrate popular authentication systems like JWT, OAuth, or custom authentication logic to secure your Next.js applications.

- Code Splitting and Lazy Loading: Next.js automatically splits your JavaScript code into smaller chunks and loads them on-demand, improving the initial load time and reducing the bundle size. This feature allows you to implement lazy loading for components, routes, or any dynamically loaded content.

- TypeScript Support: Next.js has excellent TypeScript support out of the box. It provides built-in TypeScript configuration, type checking, and IntelliSense, making it easier and safer to develop large-scale applications with strong typing.

These are just a few examples of use cases where Next.js can be beneficial. It's a versatile framework that combines the power of React with server-side rendering, static site generation, API routes, and other features to build high-performance web applications with ease.

### some knowledge:

The usage of export async function getServerSideProps() in Next.js is a special function that allows you to fetch data or perform server-side logic before the component is rendered on the server-side. This function runs on the server-side during the build process or on every incoming request, depending on the deployment configuration.

It allows you to fetch data from an API, interact with databases, or perform any server-side operations. The fetched data is then passed as props to the component, ensuring that the data is available when the page is rendered on the server-side. This enables you to pre-render dynamic data and provide a fully rendered HTML page to the client.

### suggestions on To-dos:

1 change current pictures

2 add more items

2 Change Logo

3 change theme

## Help Code

If you change the provider to fetch images from a remote source, you may choose to also download the images locally at build time to improve performance.

```js
import fs from "fs"
import axios from "axios"
import path from "path"

function getImageKey(url) {
  const split = url.split("/")
  const key = split[split.length - 1]
  const keyItems = key.split("?")
  const imageKey = keyItems[0]
  return imageKey
}

function getPathName(url, pathName = "downloads") {
  let reqPath = path.join(__dirname, "..")
  let key = getImageKey(url)
  key = key.replace(/%/g, "")
  const rawPath = `${reqPath}/public/${pathName}/${key}`
  return rawPath
}

async function downloadImage(url) {
  return new Promise(async (resolve, reject) => {
    const path = getPathName(url)
    const writer = fs.createWriteStream(path)
    const response = await axios({
      url,
      method: "GET",
      responseType: "stream",
    })
    response.data.pipe(writer)
    writer.on("finish", resolve)
    writer.on("error", reject)
  })
}

export default downloadImage
```

You can use this function to map over the inventory data after fetching and replace the image paths with a reference to the location of the downloaded images

```js
await Promise.all(
  inventory.map(async (item, index) => {
    try {
      const relativeUrl = `../downloads/${item.image}`
      if (!fs.existsSync(`${__dirname}/public/downloads/${item.image}`)) {
        await downloadImage(image)
      }
      inventory[index].image = relativeUrl
    } catch (err) {
      console.log("error downloading image: ", err)
    }
  })
)
```
