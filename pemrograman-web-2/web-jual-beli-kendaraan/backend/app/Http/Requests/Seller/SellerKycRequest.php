<?php

namespace App\Http\Requests\Seller;

use App\Enums\UserRole;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class SellerKycRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * The precise create-vs-resubmit rule (SellerProfilePolicy) is checked
     * explicitly in the controller, since this request is shared by both actions.
     */
    public function authorize(): bool
    {
        return $this->user()?->role === UserRole::Seller;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'ktp' => ['required', 'file', 'mimes:jpg,jpeg,png,pdf', 'max:5120'],
            'npwp' => ['nullable', 'file', 'mimes:jpg,jpeg,png,pdf', 'max:5120'],
        ];
    }
}
