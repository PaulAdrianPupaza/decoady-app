-- Schema for Decoady Reformas Project Management
-- Run this in Supabase SQL Editor

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Projects table
CREATE TABLE projects (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  category VARCHAR(100) NOT NULL,
  status VARCHAR(50) NOT NULL DEFAULT 'completed',
  location VARCHAR(255),
  start_date DATE,
  completion_date DATE,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Project images table (relaciona proyectos con imágenes)
CREATE TABLE project_images (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  image_path VARCHAR(500) NOT NULL, -- Path in Supabase storage
  image_url VARCHAR(500) NOT NULL, -- Full public URL
  is_main BOOLEAN DEFAULT false, -- Main project image
  alt_text VARCHAR(255),
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Services table (para gestionar servicios dinámicamente)
CREATE TABLE services (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  icon VARCHAR(50), -- Emoji or icon identifier
  category VARCHAR(100),
  featured BOOLEAN DEFAULT false,
  image_path VARCHAR(500), -- Optional service image
  image_url VARCHAR(500),
  features TEXT[], -- Array of features
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Project features table (características específicas de cada proyecto)
CREATE TABLE project_features (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  feature VARCHAR(255) NOT NULL,
  sort_order INTEGER DEFAULT 0
);

-- Create indexes for better performance
CREATE INDEX idx_projects_featured ON projects(featured);
CREATE INDEX idx_projects_status ON projects(status);
CREATE INDEX idx_projects_category ON projects(category);
CREATE INDEX idx_project_images_project_id ON project_images(project_id);
CREATE INDEX idx_project_images_main ON project_images(is_main);
CREATE INDEX idx_services_featured ON services(featured);

-- Enable Row Level Security (RLS)
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_features ENABLE ROW LEVEL SECURITY;

-- Public access policies (for read operations)
CREATE POLICY "Enable read access for all users" ON projects FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON project_images FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON services FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON project_features FOR SELECT USING (true);

-- Public write access policies (for admin operations)
-- Note: In production, you should restrict these to authenticated admin users
CREATE POLICY "Enable insert for all users" ON projects FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable update for all users" ON projects FOR UPDATE USING (true);
CREATE POLICY "Enable delete for all users" ON projects FOR DELETE USING (true);

CREATE POLICY "Enable insert for all users" ON project_images FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable update for all users" ON project_images FOR UPDATE USING (true);
CREATE POLICY "Enable delete for all users" ON project_images FOR DELETE USING (true);

CREATE POLICY "Enable insert for all users" ON services FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable update for all users" ON services FOR UPDATE USING (true);
CREATE POLICY "Enable delete for all users" ON services FOR DELETE USING (true);

CREATE POLICY "Enable insert for all users" ON project_features FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable update for all users" ON project_features FOR UPDATE USING (true);
CREATE POLICY "Enable delete for all users" ON project_features FOR DELETE USING (true);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc'::text, NOW());
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_services_updated_at BEFORE UPDATE ON services FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert some sample data
INSERT INTO projects (title, description, category, status, location, featured) VALUES
('Villa Moderna en Las Rozas', 'Construcción completa de villa moderna con diseño contemporáneo y acabados de lujo', 'residential', 'completed', 'Las Rozas, Madrid', true),
('Reforma Integral Ático Centro', 'Reforma completa de ático en el centro de Madrid con terraza y vistas panorámicas', 'renovation', 'completed', 'Centro, Madrid', true),
('Centro Comercial Alcobendas', 'Construcción de centro comercial moderno con tiendas, restaurantes y parking', 'commercial', 'in-progress', 'Alcobendas, Madrid', true);

INSERT INTO services (name, description, icon, category, featured, features) VALUES
('Construcción Nueva', 'Construcción de viviendas y edificios desde cero con los mejores materiales', '🏗️', 'construction', true, ARRAY['Obra nueva completa', 'Gestión de licencias', 'Diseño personalizado']),
('Reformas Integrales', 'Reformas completas de viviendas, oficinas y locales comerciales', '🔨', 'renovation', true, ARRAY['Reforma completa', 'Sin sorpresas en el precio', 'Acabados premium']),
('Diseño de Interiores', 'Diseño y decoración de espacios con estilo y funcionalidad', '🎨', 'design', true, ARRAY['Diseño personalizado', 'Renders 3D', 'Mobiliario incluido']),
('Consultoría Técnica', 'Asesoramiento técnico y gestión de proyectos de construcción', '📋', 'consulting', true, ARRAY['Asesoramiento legal', 'Gestión de permisos', 'Control de calidad']);

-- Note: Run this script in Supabase SQL Editor to create the database structure 