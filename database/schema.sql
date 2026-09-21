-- PostgreSQL Schema for Data Structures Demo
-- Run this in your PostgreSQL database

CREATE TABLE IF NOT EXISTS linked_list_nodes (
    id SERIAL PRIMARY KEY,
    list_id VARCHAR(50) NOT NULL,
    value TEXT NOT NULL,
    next_node_id INTEGER REFERENCES linked_list_nodes(id),
    position INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_linked_list_list_id ON linked_list_nodes(list_id);
CREATE INDEX IF NOT EXISTS idx_linked_list_next ON linked_list_nodes(next_node_id);

CREATE TABLE IF NOT EXISTS queue_items (
    id SERIAL PRIMARY KEY,
    queue_id VARCHAR(50) NOT NULL,
    value TEXT NOT NULL,
    position INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_queue_queue_id ON queue_items(queue_id);
CREATE INDEX IF NOT EXISTS idx_queue_position ON queue_items(queue_id, position);

CREATE TABLE IF NOT EXISTS stack_items (
    id SERIAL PRIMARY KEY,
    stack_id VARCHAR(50) NOT NULL,
    value TEXT NOT NULL,
    position INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_stack_stack_id ON stack_items(stack_id);
CREATE INDEX IF NOT EXISTS idx_stack_position ON stack_items(stack_id, position);

-- Metadata tables to track structure info
CREATE TABLE IF NOT EXISTS data_structures (
    id VARCHAR(50) PRIMARY KEY,
    type VARCHAR(20) NOT NULL CHECK (type IN ('linked_list', 'queue', 'stack')),
    name VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);