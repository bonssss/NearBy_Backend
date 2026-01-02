import { Request, Response } from "express";
import { pool } from "../db";
import constants from "node:constants";

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


export const getNearbyPlaces = async (req: Request, res: Response) => {
  const { lat, lng, radius } = req.query;

  if (!lat || !lng || !radius) {
    return res.status(400).json({
      error: "lat, lng and radius are required",
    });
  }

  const query = `
    SELECT
      id,
      name,
      category,
      ST_Distance(
        location,
        ST_MakePoint($1, $2)::geography
      ) AS distance_meters
    FROM places
    WHERE ST_DWithin(
      location,
      ST_MakePoint($1, $2)::geography,
      $3
    )
    ORDER BY distance_meters;
  `;

  const values = [lng, lat, radius];

  const { rows } = await pool.query(query, values);

  res.json(rows);
};

export  const getAllPlaces = async (req: Request, res: Response) => {
  const query = `SELECT id, name, category, ST_X(location::geometry) AS longitude, ST_Y(location::geometry) AS latitude FROM places;`;
  const { rows } = await pool.query(query);
  res.json(rows);
}
