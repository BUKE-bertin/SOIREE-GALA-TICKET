import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const app = express();

app.use(cors());
app.use(express.json());

app.post('/api/orders', async (req, res) => {
  try {
    const { nom, prenom, email, cin, idAsebem, pack, nombrePersonnes, beneficiaires } = req.body;

    const order = await prisma.order.create({
      data: {
        nom,
        prenom,
        email,
        cin,
        idAsebem,
        pack,
        nombrePersonnes,
        beneficiaires: {
          create: beneficiaires || [],
        },
      },
    });

    res.status(201).json({ success: true, orderId: order.id });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Failed to create order' });
  }
});

// ADMIN ROUTES (Simple Auth for MVP)
const ADMIN_TOKEN = "admin_secret_token_2026";

app.post('/api/admin/login', (req, res) => {
  const { username, password } = req.body;
  if (username === 'admin' && password === 'gala2026') {
    res.json({ token: ADMIN_TOKEN });
  } else {
    res.status(401).json({ error: 'Identifiants invalides' });
  }
});

// Middleware for Admin Auth
const requireAdmin = (req: express.Request, res: express.Response, next: express.NextFunction): void => {
  const authHeader = req.headers.authorization;
  if (authHeader === `Bearer ${ADMIN_TOKEN}`) {
    next();
  } else {
    res.status(401).json({ error: 'Non autorisé' });
  }
};

app.get('/api/admin/orders', requireAdmin, async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      include: { beneficiaires: true },
      orderBy: { createdAt: 'desc' }
    });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

app.patch('/api/admin/orders/:id/status', requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const updatedOrder = await prisma.order.update({
      where: { id },
      data: { status }
    });
    res.json(updatedOrder);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update order' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
