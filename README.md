Backend: roughly 60 minutes to build and test with postman.
- installed with npm init and npm install

- when posting a new task i assumed its completed status is false

- when updating a task i assumed the server will receive all of: title, description, completed, priority.
    i will make sure the frontend sends it, and unchanged fields will send thier unchanged values.

- minor bug with how i handle id, deleting tasks can make unconsistent ids. i decided for simplicity of code to ignore it.



Frontend: roughly 2 hours and 45 minutes
- installed using npm create vite@latest


missing functionality:
i did not have enough time to finish editing and filtering components. (i do have editing service working from the backend)
i also did not have enough time to finish styling everything, just the basic task.

in order to run the app you need to first run the server using the terminal to reach the backend folder and do: npm run dev
then do the same for the frontend folder.

