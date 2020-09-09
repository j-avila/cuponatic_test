import { Router, Request, Response } from "express";
import MySQL from "../mysql/mysql";
import { escapeId } from "mysql";

const router = Router();

router.get("/products", (req: Request, res: Response) => {
  const amount = req.query.amount || 1000;
  const query = `
    SELECT * 
    FROM datos_descuentos_buscador_prueba_2_0_csv_gz
    ORDER by vendidos DESC
    LIMIT ${amount} 
  `;

  MySQL.execQuery(query, (err: any, products: object[]) => {
    if (err) {
      res.status(400).json({
        ok: false,
        error: err,
      });
    } else {
      res.json({
        ok: true,
        products,
      });
    }
  });
});

router.get("/products/:id", (req: Request, res: Response) => {
  const id = req.params.id;
  const escapedId = MySQL.instance.connection.escape(id);

  const query = `
    SELECT * 
    FROM datos_descuentos_buscador_prueba_2_0_csv_gz
    WHERE id = ${escapedId}
  `;

  MySQL.execQuery(query, (err: any, product: object[]) => {
    if (err) {
      res.status(400).json({
        ok: false,
        error: err,
      });
    } else {
      res.json({
        ok: true,
        product: product[0],
      });
    }
  });
});

router.get("/products/search/:keyword", async (req: Request, res: Response) => {
  const keyword = req.params.keyword;
  const modKey = "'%" + keyword + "%'";

  const searchQuery = `
    SELECT * 
    FROM datos_descuentos_buscador_prueba_2_0_csv_gz
    WHERE tags LIKE LOWER (${modKey})
    OR titulo LIKE (${modKey})
    LIMIT 5
  `;
  const findWord = `
    SELECT * 
    FROM datos_descuentos_buscador_prueba_2_0_csv_gz
    WHERE tags LIKE LOWER (${modKey})
  `;

  const findAndUpdate = (table: string) => `
    SELECT @id:=id AS id, name, timesCount
    FROM ${table}
    WHERE name = ${modKey};
    
    INSERT into ${table} (id, name, timesCount) VALUES (@id, ${keyword}, 1)
    ON DUPLICATE KEY UPDATE timesCount = timesCount + 1;
    SELECT * FROM ${table}
  `;

  const queryHandler = (query: string) => {
    MySQL.execQuery(query, (err: any, products: object[]) => {
      if (err) {
        res.status(400).json({
          ok: false,
          error: err,
        });
      } else {
        res.json({
          ok: true,
          keyword,
          product: products,
        });
      }
    });
  };

  queryHandler(searchQuery);
});

export default router;
