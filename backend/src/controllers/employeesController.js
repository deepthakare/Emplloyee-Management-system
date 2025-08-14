import { z } from 'zod';
import {
  getAllEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from '../models/employeesModel.js';

const employeeSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  designation: z.string().min(2).max(100),
  salary: z.coerce.number().nonnegative(),
  date_joined: z.coerce.date(),
});

export async function list(req, res, next) {
  try {
    const data = await getAllEmployees();
    res.json(data);
  } catch (err) { next(err); }
}

export async function read(req, res, next) {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) return res.status(400).json({ error: 'Invalid ID' });
    const employee = await getEmployeeById(id);
    if (!employee) return res.status(404).json({ error: 'Employee not found' });
    res.json(employee);
  } catch (err) { next(err); }
}

export async function create(req, res, next) {
  try {
    const parsed = employeeSchema.safeParse(req.body);
    if (!parsed.success) return res.status(422).json({ error: parsed.error.flatten() });
    const employee = await createEmployee(parsed.data);
    res.status(201).json(employee);
  } catch (err) { next(err); }
}

export async function update(req, res, next) {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) return res.status(400).json({ error: 'Invalid ID' });
    const parsed = employeeSchema.safeParse(req.body);
    if (!parsed.success) return res.status(422).json({ error: parsed.error.flatten() });
    const updated = await updateEmployee(id, parsed.data);
    if (!updated) return res.status(404).json({ error: 'Employee not found' });
    res.json(updated);
  } catch (err) { next(err); }
}

export async function remove(req, res, next) {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) return res.status(400).json({ error: 'Invalid ID' });
    const ok = await deleteEmployee(id);
    if (!ok) return res.status(404).json({ error: 'Employee not found' });
    res.status(204).send();
  } catch (err) { next(err); }
}
