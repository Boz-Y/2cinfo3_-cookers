import Role from '../Models/Role.js';

// Create a new role
export const createRole = async (req, res) => {
  try {
    const { name } = req.body;

    const newRole = new Role({ name });

    const savedRole = await newRole.save();
    res.status(201).json(savedRole);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while creating the role.' });
  }
};

// Get all roles
export const getAllRoles = async (req, res) => {
  try {
    const roles = await Role.find();
    res.json(roles);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while retrieving the roles.' });
  }
};

// Get a specific role by ID
export const getRoleById = async (req, res) => {
  try {
    const { roleId } = req.params;
    const role = await Role.findById(roleId);

    if (!role) {
      return res.status(404).json({ error: 'Role not found.' });
    }

    res.json(role);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while retrieving the role.' });
  }
};

// Update a role by ID
export const updateRoleById = async (req, res) => {
  try {
    const { roleId } = req.params;
    const { name } = req.body;

    const updatedRole = await Role.findByIdAndUpdate(
      roleId,
      { name },
      { new: true }
    );

    if (!updatedRole) {
      return res.status(404).json({ error: 'Role not found.' });
    }

    res.json(updatedRole);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while updating the role.' });
  }
};

// Delete a role by ID
export const deleteRoleById = async (req, res) => {
  try {
    const { roleId } = req.params;
    const deletedRole = await Role.findByIdAndDelete(roleId);

    if (!deletedRole) {
      return res.status(404).json({ error: 'Role not found.' });
    }

    res.json(deletedRole);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while deleting the role.' });
  }
};
