from .models import Usuario
class UsuarioFactory(models.Model):
    username = models.CharField(max_length=255)
    email = models.CharField(max_length=255)
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255, blank=True)

    def __str__(self):
        return self.name