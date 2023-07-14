import express from 'express';
import {
  createRole,
  getAllRoles,
  getRoleById,
  updateRoleById,
  deleteRoleById
} from '../Controllers/Role.js';

const router = express.Router();

// Create a new role
router.post('/roles', createRole);

// Get all roles
router.get('/roles', getAllRoles);

// Get a specific role by ID
router.get('/roles/:roleId', getRoleById);

// Update a role by ID
router.put('/roles/:roleId', updateRoleById);

// Delete a role by ID
router.delete('/roles/:roleId', deleteRoleById);

export default router;
