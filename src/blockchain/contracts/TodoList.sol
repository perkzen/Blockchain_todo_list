pragma solidity ^0.5.0;


contract TodoList {

    struct Task {
        string content;
        bool completed;
    }

    modifier onlyOwner (uint _id) {
        require(taskToOwner[_id] == msg.sender);
        _;
    }

    Task[] public tasks;

    mapping(uint => address) public taskToOwner;
    mapping(address => uint)  ownerTaskCount;


    function createTask(string memory _content) public {
        uint id = tasks.push(Task(_content,false))-1;
        ownerTaskCount[msg.sender]++;
        taskToOwner[id] = msg.sender;
    }

    function toggleCompleted(uint _id) public onlyOwner(_id) {
        Task memory _task = tasks[_id];
        _task.completed = !_task.completed;
        tasks[_id] = _task;
    }

    function deleteTask(uint _id) public onlyOwner(_id) {
        delete tasks[_id];
    }

    function getTasksByOwner (address _address) public view returns (uint[] memory) {
        uint[] memory result = new uint[](ownerTaskCount[_address]);
        uint counter = 0;
        for (uint i = 0; i < tasks.length; i++) {
            if(taskToOwner[i] == _address) {
               result[counter] = i;
                counter++;
            }
        }
        return result;
    }

}