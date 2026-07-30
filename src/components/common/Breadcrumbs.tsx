import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export const Breadcrumbs: React.FC = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  if (pathnames.length === 0) return null;

  return (
    <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 text-xs">
      <ol className="flex items-center space-x-2 text-[#6B857B]">
        <li>
          <Link to="/" className="hover:text-[#1B3B36] transition-colors flex items-center gap-1">
            <Home className="w-3.5 h-3.5" />
            <span>Home</span>
          </Link>
        </li>
        {pathnames.map((name, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
          const isLast = index === pathnames.length - 1;
          const formattedName = name.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());

          return (
            <React.Fragment key={name}>
              <ChevronRight className="w-3.5 h-3.5 text-black/20" />
              <li>
                {isLast ? (
                  <span className="font-semibold text-[#1B3B36]">{formattedName}</span>
                ) : (
                  <Link to={routeTo} className="hover:text-[#1B3B36] transition-colors">
                    {formattedName}
                  </Link>
                )}
              </li>
            </React.Fragment>
          );
        })}
      </ol>
    </nav>
  );
};
