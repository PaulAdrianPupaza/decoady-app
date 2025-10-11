'use client'

import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import Button from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { ProjectService, ServiceService, CompanyService } from "@/services/dataService";
import { DatabaseService } from "@/services/databaseService";
import { formatDate } from "@/lib/utils";
import HeroCarousel from "@/components/ui/HeroCarousel";
import { useEffect, useState } from "react";
import { Project, Service } from "@/types";

export default function Home() {
  const { t } = useTranslation();
  const [featuredProjects, setFeaturedProjects] = useState<Project[]>([]);
  const [featuredServices, setFeaturedServices] = useState<Service[]>([]);
  const [companyStats, setCompanyStats] = useState<{
    projectsCompleted: number;
    clientsSatisfied: number;
    yearsOfExperience: number;
    averageRating: number;
  }>({
    projectsCompleted: 0,
    clientsSatisfied: 0,
    yearsOfExperience: 0,
    averageRating: 0
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        // Load projects
        let projects;
        try {
          projects = await DatabaseService.getFeaturedProjects(3);
          if (projects.length === 0) {
            projects = ProjectService.getFeaturedProjects(3);
          }
        } catch {
          console.log('Database not available, using mock data');
          projects = ProjectService.getFeaturedProjects(3);
        }

        // Load services - Using mock data only for now
        const services = ServiceService.getFeaturedServices(3);

        const stats = CompanyService.getCompanyStats();

        setFeaturedProjects(projects);
        setFeaturedServices(services);
        setCompanyStats(stats);
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };

    loadData();
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section with Dynamic Background */}
      <HeroCarousel className="group">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in">
            {t('hero.title')}
            <span className="block text-amber-400">{t('hero.titleHighlight')}</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed">
            {t('hero.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/proyectos">
              <Button variant="secondary" size="lg" className="text-lg px-8 py-4">
                {t('hero.ctaViewProjects')}
              </Button>
            </Link>
            <Link href="/contacto">
              <Button variant="outline" size="lg" className="text-lg px-8 py-4 border-white text-white hover:bg-white hover:text-blue-900">
                {t('hero.ctaFreeQuote')}
              </Button>
            </Link>
          </div>
        </div>
      </HeroCarousel>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">
                {companyStats.projectsCompleted}+
              </div>
              <div className="text-gray-600 font-medium">{t('stats.projectsCompleted')}</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">
                {companyStats.clientsSatisfied}+
              </div>
              <div className="text-gray-600 font-medium">{t('stats.clientsSatisfied')}</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">
                {companyStats.yearsOfExperience}
              </div>
              <div className="text-gray-600 font-medium">{t('stats.yearsOfExperience')}</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">
                {companyStats.averageRating}
              </div>
              <div className="text-gray-600 font-medium">{t('stats.averageRating')}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('services.title')}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('services.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredServices.map((service) => (
              <Card key={service.id} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <CardHeader className="text-center">
                  <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">
                    {service.icon}
                  </div>
                  <CardTitle className="text-xl">{service.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <ul className="space-y-2">
                    {service.features.slice(0, 3).map((feature, index) => (
                      <li key={index} className="flex items-center text-sm text-gray-500">
                        <svg className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('projects.title')}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('projects.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map((project) => (
              <Link key={project.id} href={`/proyectos/${project.id}`} className="block h-full">
                <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer h-full flex flex-col">
                  <div className="relative h-64 overflow-hidden">
            <Image
                      src={project.main_image || "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                        {t(`projects.categories.${project.category}`)}
                      </span>
                    </div>
                    {project.featured && (
                      <div className="absolute top-4 right-4">
                        <span className="bg-amber-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                          ⭐ {t('projects.featured')}
                        </span>
                      </div>
                    )}
                  </div>
                  <CardContent className="p-6 flex-1">
                    <CardTitle className="mb-2">{project.title}</CardTitle>
                    <p className="text-gray-600 mb-4 line-clamp-2">{project.description}</p>
                    <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                      <span className="flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        </svg>
                        {project.location}
                      </span>
                    </div>
                    {project.completion_date && (
                      <div className="text-sm text-gray-500">
                        Completado: {formatDate(project.completion_date)}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/proyectos">
              <Button variant="primary" size="lg">
                {t('projects.viewAll')}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                {t('about.title')}
              </h2>
              <p className="text-xl text-gray-600 mb-6">
                {t('about.subtitle')}
              </p>
              <p className="text-gray-600 mb-8 leading-relaxed">
                {t('about.description')}
              </p>
              
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    {companyStats.yearsOfExperience}+
                  </div>
                  <div className="text-gray-600 font-medium">{t('about.yearsExperience')}</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    {companyStats.projectsCompleted}+
                  </div>
                  <div className="text-gray-600 font-medium">{t('about.projectsCompleted')}</div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center">
                  <svg className="w-6 h-6 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">{t('about.feature1')}</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-6 h-6 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">{t('about.feature2')}</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-6 h-6 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">{t('about.feature3')}</span>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden bg-gray-200">
                <Image
                  src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Equipo de construcción trabajando"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-blue-600 text-white p-6 rounded-xl">
                <div className="text-2xl font-bold mb-1">{companyStats.clientsSatisfied}+</div>
                <div className="text-blue-100 text-sm">{t('about.happyClients')}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-amber-500 to-amber-600">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {t('cta.title')}
          </h2>
          <p className="text-xl text-amber-100 mb-8 max-w-2xl mx-auto">
            {t('cta.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contacto">
              <Button variant="primary" size="lg" className="bg-white text-amber-600 hover:bg-gray-100">
                {t('cta.requestQuote')}
              </Button>
            </Link>
            <a href="tel:+34650242511">
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-amber-600">
                {t('cta.callNow')}
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
