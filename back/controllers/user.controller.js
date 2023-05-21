import User from '../models/user.model.js'

async function getUserById(req, res) {
    const { id } = req.params;
    try {
      const user = await User.findById(id);        
      if (!user) {
        res.json({ message: 'User not found' });
      } else {
        res.json(user);
      }
    } catch (e) {        
      res.json({ error: e.message });
    }
}

async function createUser(req, res) {
  try {
    const { name, age, email } = req.body;
    console.log(req.body);
    if (!name || !email || !age) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    const user = await User.create(name, email, age);    
    res.status(201).json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
}

async function getAllUsers(req, res) {
  const pageSize = parseInt(req.query.pageSize) || 10;
  const pageNumber = parseInt(req.query.pageNumber) || 1;
  try {
    const result = await User.getAll(pageSize, pageNumber);
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Unable to retrieve users', error: error.message });
  }
}

async function updateUser(req, res) {
  const { id } = req.params
  try {
    const { name, email, age } = req.body
    const user = await User.update(id, name, email, age)
    res.status(200).json({ success: true, data: user });
  } catch (e) {
    res.status(400).json({ success: false, message: e.message });
  }
}

async function deleteUser(req, res) {
  const { id } = req.params
  try {
    await User.delete(id)
    res.status(200).json({ success: true, message: 'user deleted' });
  } catch (e) {
    res.status(400).json({ success: false, message: e.message });
  }
}

export { getUserById, createUser, getAllUsers, updateUser, deleteUser }