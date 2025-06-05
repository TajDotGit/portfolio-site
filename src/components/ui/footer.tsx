import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t py-12 md:py-16">
      <div className="container px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-8 md:mb-0">
            <div className="font-bold text-xl mb-2">Taj Ikhlaas</div>
            <p className="text-sm text-muted-foreground max-w-xs">
              Building exceptional digital products with a focus on user experience and business outcomes.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12 text-center md:text-left">
            <div>
              <h4 className="font-medium mb-4">Navigation</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#about" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#projects" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    Projects
                  </a>
                </li>
                <li>
                  <a href="#contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium mb-4">Social</h4>
              <ul className="space-y-2">
                <li>
                  <a 
                    href="https://www.linkedin.com/in/tajammul-ikhlaas-b1a241265/" 
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a 
                    href="https://github.com/TajDotGit" 
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GitHub
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium mb-4">Legal</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    Terms
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Taj Ikhlaas. All rights reserved.
          </div>
          <div className="mt-4 md:mt-0 text-sm text-muted-foreground">Designed & Built with ♥</div>
        </div>
      </div>
    </footer>
  )
} 