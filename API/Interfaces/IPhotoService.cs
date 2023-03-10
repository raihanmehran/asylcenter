using CloudinaryDotNet.Actions;

namespace API.Interfaces
{
    public interface IPhotoService
    {
        Task<ImageUploadResult> AddPhotoAsync(IFormFile file, string storageFolder);
        Task<DeletionResult> DeletePhotoAsync(string publicId);
    }
}