
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Trash2, Plus, Edit, Eye } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  category: string;
  image_url: string;
  location?: string;
  guests?: string;
  date?: string;
  featured: boolean;
}

const PortfolioManager = () => {
  const { toast } = useToast();
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<PortfolioItem | null>(null);
  const [newItem, setNewItem] = useState({
    title: '',
    description: '',
    category: '',
    image_url: '',
    location: '',
    guests: '',
    date: '',
    featured: false
  });

  const categories = ['Weddings', 'Corporate', 'Entertainment', 'Outdoor Events', 'Concerts', 'Religious', 'Graduations'];

  useEffect(() => {
    fetchPortfolioItems();
  }, []);

  const fetchPortfolioItems = async () => {
    try {
      const { data, error } = await supabase
        .from('portfolio_items')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPortfolioItems(data || []);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch portfolio items",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddItem = async () => {
    if (!newItem.title || !newItem.category || !newItem.image_url) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('portfolio_items')
        .insert([newItem]);

      if (error) throw error;

      await fetchPortfolioItems();
      resetForm();
      setIsAddDialogOpen(false);
      
      toast({
        title: "Success",
        description: "Portfolio item added successfully"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add portfolio item",
        variant: "destructive"
      });
    }
  };

  const handleUpdateItem = async () => {
    if (!editingItem || !newItem.title || !newItem.category || !newItem.image_url) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('portfolio_items')
        .update(newItem)
        .eq('id', editingItem.id);

      if (error) throw error;

      await fetchPortfolioItems();
      resetForm();
      setEditingItem(null);
      setIsAddDialogOpen(false);
      
      toast({
        title: "Success",
        description: "Portfolio item updated successfully"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update portfolio item",
        variant: "destructive"
      });
    }
  };

  const handleDeleteItem = async (id: string) => {
    try {
      const { error } = await supabase
        .from('portfolio_items')
        .delete()
        .eq('id', id);

      if (error) throw error;

      await fetchPortfolioItems();
      toast({
        title: "Success",
        description: "Portfolio item deleted successfully"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete portfolio item",
        variant: "destructive"
      });
    }
  };

  const handleEditItem = (item: PortfolioItem) => {
    setEditingItem(item);
    setNewItem({
      title: item.title,
      description: item.description || '',
      category: item.category,
      image_url: item.image_url,
      location: item.location || '',
      guests: item.guests || '',
      date: item.date || '',
      featured: item.featured
    });
    setIsAddDialogOpen(true);
  };

  const resetForm = () => {
    setNewItem({
      title: '',
      description: '',
      category: '',
      image_url: '',
      location: '',
      guests: '',
      date: '',
      featured: false
    });
    setEditingItem(null);
  };

  if (loading) {
    return <div className="text-center py-8">Loading portfolio items...</div>;
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <Eye className="h-5 w-5" />
          Portfolio Management
        </CardTitle>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="h-4 w-4 mr-2" />
              Add Item
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingItem ? 'Edit Portfolio Item' : 'Add New Portfolio Item'}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    placeholder="Event title"
                    value={newItem.title}
                    onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="category">Category *</Label>
                  <Select 
                    value={newItem.category} 
                    onValueChange={(value) => setNewItem({ ...newItem, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Event description"
                  value={newItem.description}
                  onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                />
              </div>
              
              <div>
                <Label htmlFor="image-url">Image URL *</Label>
                <Input
                  id="image-url"
                  placeholder="https://example.com/image.jpg"
                  value={newItem.image_url}
                  onChange={(e) => setNewItem({ ...newItem, image_url: e.target.value })}
                />
              </div>
              
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    placeholder="Event location"
                    value={newItem.location}
                    onChange={(e) => setNewItem({ ...newItem, location: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="guests">Guests</Label>
                  <Input
                    id="guests"
                    placeholder="e.g., 200+"
                    value={newItem.guests}
                    onChange={(e) => setNewItem({ ...newItem, guests: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    placeholder="2024"
                    value={newItem.date}
                    onChange={(e) => setNewItem({ ...newItem, date: e.target.value })}
                  />
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch
                  id="featured"
                  checked={newItem.featured}
                  onCheckedChange={(checked) => setNewItem({ ...newItem, featured: checked })}
                />
                <Label htmlFor="featured">Featured Item</Label>
              </div>
              
              <Button 
                onClick={editingItem ? handleUpdateItem : handleAddItem}
                className="w-full"
              >
                {editingItem ? 'Update Item' : 'Add Item'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolioItems.map((item) => (
            <div key={item.id} className="relative group">
              <img
                src={item.image_url}
                alt={item.title}
                className="w-full h-48 object-cover rounded-lg"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-2">
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => handleEditItem(item)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleDeleteItem(item.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <div className="mt-2">
                <div className="flex items-center justify-between">
                  <p className="font-medium">{item.title}</p>
                  {item.featured && (
                    <span className="text-xs bg-accent text-white px-2 py-1 rounded">Featured</span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">{item.category}</p>
                {item.location && <p className="text-xs text-muted-foreground">{item.location}</p>}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default PortfolioManager;
