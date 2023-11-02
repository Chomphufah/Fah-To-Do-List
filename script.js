// อ้างอิงถึง html
const taskInput = document.querySelector('.form-control');
const addButton = document.querySelector('.btn-light-pink');
const taskList = document.querySelector('.container');

//เมื่อปุ่ม add ถูกคลิก
addButton.addEventListener('click', function () {
    // Get the task text from the input field
    const taskText = taskInput.value;

    // เพิ่ม task ใหม่ 
    const taskElement = document.createElement('div');
    taskElement.classList.add('card', 'mt-2', 'p-3', 'd-flex', 'justify-content-between', 'align-items-center');

    // คำอธิบาย task
    const taskTextElement = document.createElement('div');
    taskTextElement.classList.add('flex-grow-1', 'text-start', 'task-text', 'align-self-start'); // Explicitly set text-left class

    // สร้าง checkbox
    const checkboxInput = document.createElement('input');
    checkboxInput.type = 'checkbox';
    checkboxInput.classList.add('form-check-input', 'checkbox');
    checkboxInput.style.marginRight = '10px'; 
    checkboxInput.addEventListener('change', function () {
        if (checkboxInput.checked) {
            // เมื่อ checkbox ถูก
            taskTextElement.style.textDecoration = 'line-through'; //จะมีเส้นขีดทับข้อความ
            taskTextElement.style.color = 'grey'; // เปลี่ยนสีข้อความเป็นสีเทา
        } else {
            // เมื่อ unchecked
            taskTextElement.style.textDecoration = 'none'; //ลบเส้นขีด
            taskTextElement.style.color = 'initial'; //กลับไปสีเดิม
        }
    });

    // Create a div for the buttons (on the right)
    const buttonDiv = document.createElement('div');
    buttonDiv.classList.add('ml-auto'); // Use Bootstrap class to push buttons to the right

    // สร้างปุ่มแก้ไข
    const editButton = document.createElement('button');
    editButton.classList.add('btn', 'btn-light-blue', 'edit-icon', 'mx-2');
    editButton.innerHTML = '<i class="fas fa-pencil-alt"></i>'; //ไอคอนดินสอ

    // สร้างปุ่มลบ
    const deleteButton = document.createElement('button');
    deleteButton.classList.add('btn', 'btn-light-red', 'delete-icon');
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>'; //ไอคอนถังขยะ

    // ปุ่มลบ
    deleteButton.addEventListener('click', function () {
        // ลบ task เมื่อคลิกปุ่ม
        taskList.removeChild(taskElement);
    });

    // แก้ไขข้อความ
    function enableEditing() {
        const inputField = document.createElement('input'); //ป้อนข้อความใหม่
        inputField.value = taskTextElement.textContent;
        inputField.classList.add('form-control');
        taskTextElement.textContent = '';
        taskTextElement.appendChild(inputField);
        editButton.removeEventListener('click', enableEditing); // Remove the event listener to avoid multiple input fields

        // เมื่อ enter จะแก้ไข
        inputField.addEventListener('keyup', function (event) {
            if (event.key === 'Enter') {
                taskTextElement.textContent = inputField.value;
                inputField.remove();
                editButton.addEventListener('click', enableEditing); // Add back the edit event listener
            }
        });
    }


    // เพิ่ม enableEditing เมื่อคลิก editButton
    editButton.addEventListener('click', enableEditing);

    // เพิ่ม checkboxInput ใน taskTextElement
    taskTextElement.appendChild(checkboxInput);

    // เพิ่ม taskText ใน taskTextElement
    taskTextElement.appendChild(document.createTextNode(taskText));

    // เพิ่ม taskTextElement ใน taskElement
    taskElement.appendChild(taskTextElement);

    // เพิ่ม editButton และ deleteButton ใน buttonDiv
    buttonDiv.appendChild(editButton);
    buttonDiv.appendChild(deleteButton);

    // เพิ่ม buttondiv ใน taskElement
    taskElement.appendChild(buttonDiv);

    // เพื่ิม taskElement ใน taskList
    taskList.appendChild(taskElement);

    // clear ค่าใน taskInput.value เมื่อเพิ่มเสร็จ เพื่อให้สามารถเพิ่ม task ถัดไป
    taskInput.value = '';
});
