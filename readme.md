# Projet B3 – Test Qualité Efrei

## 1. Présentation

Ce projet est un **exemple de gestion de produits et commandes** en Node.js / TypeScript avec Express et TypeORM.  
Il suit les règles de qualité de code et l’architecture **Clean / DDD-light** vues en TP.

**Technologies utilisées :**

- Node.js / TypeScript
- Express
- TypeORM
- PostgreSQL / SQLite (configurable)
- Git / GitHub

---

## 2. Fonctionnalités principales

### 2.1 Création de produit

- L’utilisateur peut créer un produit avec :
    - `title` (string, min 3 caractères)
    - `description` (string, optionnel)
    - `price` (number, >0 et ≤10000)
- Les règles métier sont **encapsulées dans l’entité `Product`**.
- Sauvegarde dans la base via TypeORM.

### 2.2 Création de commande

- L’utilisateur peut créer une commande avec :
    - `productIds` (tableau de 1 à 5 ids)
    - `totalPrice` (min 2€, max 500€)
- La commande génère automatiquement :
    - `status = PENDING`
    - `createdAt = date actuelle`
- Les validations sont **encapsulées dans l’entité `Order`**.
- Sauvegarde dans la base via TypeORM.

---

### 3. Organisation

- `Entity` : contient les objets métier avec **encapsulation et validations internes**
- `UseCase` : contient la logique applicative (création produit / commande)
- `Repository` : interface + implémentation TypeORM
- `Controller` : interface HTTP (Express)
- Respect de la séparation des responsabilités et principe **Single Responsibility**

---

## 4. Installation

Cloner le repo :

```bash
git clone https://github.com/justxwayz/b3-efrei-test-qualite.git
cd b3-efrei-test-qualite
```

Installer les dépendances :

```bash
npm install
```

Configurer la base dans config/db.config.ts (PostgreSQL / SQLite / autre).

---

## 5. Lancement du serveur

```bash
npm run dev      
npm start

```

---
