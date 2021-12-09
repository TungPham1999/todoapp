## 1.How `Use Effect()` work in simple way ?

### `Concept`

is a hook handle side effects after a component renders

### `Ingredient`

side effect and clean up (optional)

### `How to work`

Mounting: 
1. rendering
2. `useEffect()` run

Updating:
1. rendering
2. run `useEffect() cleanup` if dependencies change  
3. run `useEffect()` if dependencies change


Unmounting:
1. run `useEffect() cleanup`

### `Dependencies`

if not have dependencies: run every after rendering

if dependencies are array: only executed side effect after the first render

if dependencies are references: only executed side effect after the first render and when references change

## 2. About "Context" in React ?

### What is this ?

Context provides a way to pass data through the component tree without having to pass props down manually at every level.

### When you need context ? 

The main idea of using the context is to allow your components to access some global data and re-render when that global data is changed. 
Context solves the props drilling problem: when you have to pass down props from parents to children.

### Why do your context ?

Problem: 
1. Prop drilling is the processing of getting data from component A to component Z by passing it through multiple layers. So it make the project messed up. 
2. Further, if you want to change state of function parent 1 from grade 10 of parent it, you need 10 functions to do it. That's ridiculous.

Solution: Use context API.

With problem 1:  Very simple, you set up a Context Provider and define the data you need to contain it. And get it with Context Consumer whenever you need to use the data in the store.
With problem 2: We define a function on the state of the AppProvider context, and do the required updates onto the state data.
Having the action defined we can use it through a AppContext.Consumer and call it in through any event.

### Others

When I work with the Context API, I have a few things to keep in mind:
You shouldn't be reaching for context to solve every state sharing problem that crosses your desk.
Context does NOT have to be global to the whole app but can be applied to one part of your tree
You can (and probably should) have multiple logically separated contexts in your app.
If the version of your project is less than 16.3 you need to migrate the version to use this amazing feature of React

## 3. About project ?

1.About project you need close github of me, and `yarn` or `npm install`

So if I have errors in grammar and words, please contribute to me. THANKS
