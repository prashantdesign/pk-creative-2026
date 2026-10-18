'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { signOut } from 'firebase/auth';
import { collection, query, where } from 'firebase/firestore';
import { useAuth, useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import type { ContactMessage } from '@/types';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenuBadge,
} from '@/components/ui/sidebar';
import {
  LayoutDashboard,
  Palette,
  Briefcase,
  Mails,
  Settings,
  LogOut,
  Images,
  FolderKanban,
  MessageSquareQuote,
  Instagram,
  Search,
  Users,
  Globe,
  ExternalLink,
} from 'lucide-react';
import Logo from '@/components/logo';
import { useToast } from '@/hooks/use-toast';

const AdminSidebar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { toast } = useToast();
  const auth = useAuth();
  const firestore = useFirestore();

  const handleLogout = async () => {
    if (!auth) return;
    try {
      await signOut(auth);
      toast({
        title: "Logged Out",
        description: "You have been successfully logged out.",
      });
      router.push('/pk-admin');
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Logout Failed",
        description: "There was a problem logging out.",
      });
    }
  };

  const messagesQuery = useMemoFirebase(
    () => (firestore ? query(collection(firestore, 'pkcreative_contactMessages'), where('isRead', '==', false)) : null),
    [firestore]
  );
  const { data: unread } = useCollection<ContactMessage>(messagesQuery);
  const unreadCount = unread?.length ?? 0;

  const groups = [
    {
      label: 'Overview',
      items: [{ href: '/pk-admin', label: 'Dashboard', icon: LayoutDashboard }],
    },
    {
      label: 'Content',
      items: [
        { href: '/pk-admin/site-content', label: 'Site Content', icon: Palette },
        { href: '/pk-admin/projects', label: 'Projects', icon: Briefcase },
        { href: '/pk-admin/gallery', label: 'Gallery', icon: Images },
        { href: '/pk-admin/categories', label: 'Categories', icon: FolderKanban },
        { href: '/pk-admin/websites', label: 'Websites', icon: Globe },
        { href: '/pk-admin/team', label: 'Team', icon: Users },
        { href: '/pk-admin/testimonials', label: 'Testimonials', icon: MessageSquareQuote },
      ],
    },
    {
      label: 'Growth',
      items: [
        { href: '/pk-admin/seo', label: 'SEO & Analytics', icon: Search },
        { href: '/pk-admin/instagram', label: 'Instagram', icon: Instagram },
      ],
    },
    {
      label: 'Inbox & System',
      items: [
        { href: '/pk-admin/messages', label: 'Messages', icon: Mails, badge: unreadCount },
        { href: '/pk-admin/settings', label: 'Settings', icon: Settings },
      ],
    },
  ];

  return (
    <Sidebar>
      <SidebarHeader>
        <Logo />
        <p className="px-1 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">Admin Console</p>
      </SidebarHeader>
      <SidebarContent>
        {groups.map((group) => (
          <SidebarGroup key={group.label}>
            <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      asChild
                      isActive={pathname === item.href || (item.href !== '/pk-admin' && pathname.startsWith(item.href))}
                    >
                      <Link href={item.href}>
                        <item.icon className="size-4" />
                        <span>{item.label}</span>
                      </Link>
                    </SidebarMenuButton>
                    {'badge' in item && !!item.badge && <SidebarMenuBadge>{item.badge}</SidebarMenuBadge>}
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <a href="/" target="_blank" rel="noopener noreferrer">
                <ExternalLink className="size-4" />
                <span>View live site</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton onClick={handleLogout}>
              <LogOut className="size-4" />
              <span>Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AdminSidebar;
