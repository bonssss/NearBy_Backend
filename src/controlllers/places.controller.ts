import { Request, Response } from "express";
import { pool } from "../db";

export const createPlace = async (req: Request, res: Response) => {
  const { name, category, latitude, longitude } = req.body;

  if (!name || latitude == null || longitude == null) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const query = `
    INSERT INTO places (name, category, location)
    VALUES ($1, $2, ST_MakePoint($3, $4)::geography)
    RETURNING *;
  `;

  const values = [name, category, longitude, latitude];

  const { rows } = await pool.query(query, values);

  res.status(201).json(rows[0]);
};
