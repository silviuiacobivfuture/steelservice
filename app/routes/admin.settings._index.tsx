import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import GeneralSettings from "@/components/admin/settings/GeneralSettings";
import SecuritySettings from "@/components/admin/settings/SecuritySettings";
import NotificationSettings from "@/components/admin/settings/NotificationSettings";
import IntegrationSettings from "@/components/admin/settings/IntegrationSettings";

export default function SettingsAdmin() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Settings</h1>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <GeneralSettings />
        </TabsContent>

        <TabsContent value="security">
          <SecuritySettings />
        </TabsContent>

        <TabsContent value="notifications">
          <NotificationSettings />
        </TabsContent>

        <TabsContent value="integrations">
          <IntegrationSettings />
        </TabsContent>
      </Tabs>
    </div>
  );
}