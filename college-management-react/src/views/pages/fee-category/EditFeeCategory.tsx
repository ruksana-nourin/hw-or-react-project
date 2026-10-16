
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import {api} from "../../../api";
import AlertMessage from "../../components/AlertMsg";
import PageHeading from "../../components/PageHeading";

interface FeeCategory {
  id: number;
  name: string;
}

export default function EditFeeCategory() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [errors, setErrors] = useState<{ name?: string }>({});

  useEffect(() => {
    const fetchFeeCategory = async () => {
      try {
        const response = await api.get(`fee-categories/${id}`);
        const payload = response.data;

        const category: FeeCategory =
          payload.fee_category ??
          payload.feeCategory ??
          payload.data ??
          payload;

        setName(category.name ?? "");
      } catch (err: any) {
        setError(
          err.response?.data?.message ||
            "Failed to load fee category."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchFeeCategory();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setErrors({});
    setError("");

    if (!name.trim()) {
      setErrors({ name: "Category name is required." });
      return;
    }

    setSaving(true);

    try {
      await api.put(`fee-categories/${id}`, {
        name: name.trim(),
      });

      navigate("/fee-categories", {
        state: {
          successMessage: "Fee category updated successfully!",
        },
      });
    } catch (err: any) {
      const responseErrors = err.response?.data?.errors;

      if (responseErrors) {
        setErrors({
          name: responseErrors.name?.[0],
        });
      } else {
        setError(
          err.response?.data?.message ||
            "Failed to update fee category."
        );
      }
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-64 items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-purple-200 border-t-purple-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeading
        title="Edit Fee Category"
        subtitle="Update the fee category information."
        buttonLink="/fee-categories"
        buttonText="Back to Fee Categories"
        buttonColor="blue"
        icon="back"
      />

      {error && (
        <AlertMessage
          type="error"
          message={error}
          onClose={() => setError("")}
        />
      )}

      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-8">
        <div className="mb-6 border-b border-gray-200 pb-5 dark:border-gray-700">
          <h3 className="text-lg font-bold text-gray-800 dark:text-white">
            Category Information
          </h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Edit the name of this fee category.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="max-w-2xl">
            <label
              htmlFor="name"
              className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-200"
            >
              Category Name <span className="text-red-500">*</span>
            </label>

            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setErrors({});
              }}
              placeholder="Enter category name"
              className={`w-full rounded-xl border bg-white px-4 py-3 text-sm text-gray-800 outline-none transition focus:ring-2 dark:bg-gray-900 dark:text-white ${
                errors.name
                  ? "border-red-500 focus:ring-red-200"
                  : "border-gray-300 focus:border-purple-500 focus:ring-purple-200 dark:border-gray-600 dark:focus:ring-purple-900"
              }`}
            />

            {errors.name && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                {errors.name}
              </p>
            )}
          </div>

          <div className="mt-8 flex flex-col-reverse gap-4 border-t border-gray-200 pt-6 dark:border-gray-700 sm:flex-row sm:justify-end">
            <Link
              to="/fee-categories"
              className="inline-flex min-h-12 items-center justify-center rounded-xl border border-gray-300 bg-white px-6 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
            >
              Cancel
            </Link>

            <button
              type="submit"
              disabled={saving}
              className="inline-flex min-h-12 items-center justify-center rounded-xl bg-purple-600 px-7 py-3 text-sm font-semibold text-white transition hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? "Updating..." : "Update Category"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
