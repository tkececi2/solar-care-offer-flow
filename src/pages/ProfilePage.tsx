
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { AlertCircle, ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const formSchema = z.object({
  name: z.string().min(2, "İsim en az 2 karakterden oluşmalıdır"),
  email: z.string().email("Geçerli bir e-posta adresi giriniz"),
  phone: z.string().optional(),
  company: z.string().optional(),
  plantCapacity: z.number().min(0, "Kapasite 0'dan küçük olamaz").optional(),
  plantLocation: z.string().optional(),
  panelCount: z.number().min(0, "Panel sayısı 0'dan küçük olamaz").optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function ProfilePage() {
  const { user, updateProfile } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      phone: user?.phone || "",
      company: user?.company || "",
      plantCapacity: user?.plantDetails?.capacity || 0,
      plantLocation: user?.plantDetails?.location || "",
      panelCount: user?.plantDetails?.panelCount || 0,
    },
  });

  if (!user) {
    return (
      <MainLayout>
        <div className="container max-w-3xl mx-auto px-4 py-12">
          <div className="bg-destructive/10 p-4 rounded-lg flex items-center mb-6">
            <AlertCircle className="text-destructive mr-2 h-5 w-5" />
            <span>Profil sayfasına erişmek için giriş yapmanız gerekmektedir.</span>
          </div>
          <div className="flex justify-center">
            <Button onClick={() => navigate("/login")}>Giriş Yap</Button>
          </div>
        </div>
      </MainLayout>
    );
  }

  async function onSubmit(data: FormValues) {
    setIsLoading(true);
    try {
      // Profil güncellemesi
      updateProfile({
        name: data.name,
        email: data.email,
        phone: data.phone,
        company: data.company,
        plantDetails: {
          capacity: data.plantCapacity,
          location: data.plantLocation,
          panelCount: data.panelCount,
        },
      });
      
      toast.success("Profil başarıyla güncellendi");
    } catch (error) {
      toast.error("Profil güncellenirken bir hata oluştu");
      console.error("Profile update error:", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <MainLayout>
      <div className="container max-w-3xl mx-auto px-4 py-12">
        <Link
          to="/dashboard"
          className="inline-flex items-center text-primary hover:text-primary/90 mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Dashboard'a Dön
        </Link>

        <Card>
          <CardHeader>
            <CardTitle>Profil Bilgileri</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Kişisel Bilgiler</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Ad Soyad</FormLabel>
                          <FormControl>
                            <Input placeholder="Ad Soyad" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>E-posta</FormLabel>
                          <FormControl>
                            <Input placeholder="ornek@firma.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Telefon</FormLabel>
                          <FormControl>
                            <Input placeholder="05xx xxx xx xx" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="company"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Firma</FormLabel>
                          <FormControl>
                            <Input placeholder="Firma Adı" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div className="space-y-4 pt-4 border-t border-border">
                  <h3 className="text-lg font-medium">Santral Bilgileri</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="plantCapacity"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Santral Kapasitesi (kWp)</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="100"
                              {...field}
                              onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                            />
                          </FormControl>
                          <FormDescription>
                            Santralinizin toplam kurulu gücü
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="plantLocation"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Santral Konumu</FormLabel>
                          <FormControl>
                            <Input placeholder="İzmir, Türkiye" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="panelCount"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Panel Sayısı</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="180"
                              {...field}
                              onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? "Güncelleniyor..." : "Bilgileri Güncelle"}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
